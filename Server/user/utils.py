from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist


def authenticate_token(token_key):
    """
    Manually authenticate a DRF token.
    Returns the user object if valid, otherwise None.
    """
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except ObjectDoesNotExist:
        return None
