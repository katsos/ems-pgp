from django.db.models import Sum


def get_sum_of(queryset, field):
    return queryset.aggregate(Sum(field))[f'{field}__sum'] or 0
