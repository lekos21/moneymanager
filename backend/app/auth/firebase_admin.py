import firebase_admin
from firebase_admin import credentials, auth
import os
import traceback

# Path to the Firebase Admin SDK service account key
cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')

# Initialize Firebase Admin SDK with try/except for more robust error handling
try:
    # Check if the Firebase app is already initialized
    try:
        firebase_app = firebase_admin.get_app()
        print("Firebase app already initialized")
    except ValueError:
        # Not initialized yet, initialize the app
        print(f"Initializing Firebase admin with credentials from: {cred_path}")
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_app = firebase_admin.initialize_app(cred)
        else:
            print(f"Warning: Firebase credentials file not found at {cred_path}")
            # Initialize with no credentials for development (will only work with mock token)
            firebase_app = firebase_admin.initialize_app()
            print("Firebase initialized without credentials - only mock authentication will work")
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    traceback.print_exc()
    # Define the app as None, will rely on mock authentication
    firebase_app = None

def verify_firebase_token(id_token):
    """
    Verify the Firebase ID token and return the decoded token.
    """
    try:
        # Special case for development
        if id_token == "test-token-for-swagger-ui":
            print("Using test token for authentication")
            return {
                "uid": "admin",
                "email": "admin@admin.com",
                "name": "admin"
            }
            
        # Proceed with normal verification
        if firebase_app is None:
            print("Firebase app not initialized, cannot verify token")
            return None
            
        # Verify the ID token with more detailed logging
        print(f"Verifying token: {id_token[:10]}...")
        decoded_token = auth.verify_id_token(id_token)
        print(f"Token verified successfully for user: {decoded_token.get('uid')}")
        return decoded_token
    except auth.InvalidIdTokenError:
        print(f"Invalid ID token provided")
        return None
    except auth.ExpiredIdTokenError:
        print(f"Expired ID token provided")
        return None
    except auth.RevokedIdTokenError:
        print(f"Revoked ID token provided")
        return None
    except Exception as e:
        # Handle token verification errors with traceback
        print(f"Token verification error: {e}")
        traceback.print_exc()
        return None
