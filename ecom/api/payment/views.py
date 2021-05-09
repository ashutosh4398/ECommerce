from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import braintree
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

gateway = braintree.BraintreeGateway(
            braintree.Configuration(
                environment=braintree.Environment.Sandbox,
                merchant_id=settings.MERCHANT_ID,
                public_key=settings.PUBLIC_KEY,
                private_key=settings.PRIVATE_KEY,
            )
        )

class GenerateToken(APIView):
    
    def get(self,request):
        return Response({
            "clientToken": gateway.client_token.generate(),
            "success": True
        })


class ProcessPayment(APIView):
    def post(self,request):
        nonce_from_the_client = request.POST.get("payment_method_nonce")
        amount_from_the_client = request.POST.get("amount")
        print(nonce_from_the_client)
        print(amount_from_the_client)
        result = gateway.transaction.sale({
            "amount": amount_from_the_client,
            "payment_method_nonce": nonce_from_the_client,
            "options": {
                "submit_for_settlement": True
            }
        })

        if result.is_success:
            return Response({
                "success": result.is_success,
                "transaction": {
                    "id": result.transaction.id,
                    "amount": result.transaction.amount
                }
            })
        
        return Response({"error": True, })