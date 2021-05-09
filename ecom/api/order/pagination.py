from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        # print(data)
        response = super().get_paginated_response(data)
        # returns number of pages (just so that user can directly skip few pages)
        # extracted response data
        response = response.data
        # added custom data in response
        response['num_pages'] = self.page.paginator.num_pages
        # returned in response form
        return Response(response)