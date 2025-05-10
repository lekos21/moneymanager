from fastapi import Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer
from .firebase_admin import verify_firebase_token
import json
from typing import Optional, Dict, Any

# Per l'autenticazione tramite Swagger UI e API
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token", auto_error=False)

# Utente mock per test in Swagger UI
MOCK_USER = {
    "user_id": "admin",
    "email": "admin@admin.com",
    "name": "admin"
}

# Token mock per test in Swagger UI
MOCK_TOKEN = "test-token-for-swagger-ui"

def get_current_user(token: Optional[str] = Security(oauth2_scheme)):
    """
    Dependency per validare il token di autenticazione ed estrarre le informazioni utente.
    Supporta sia i token Firebase che i token di test.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Autenticazione richiesta"
        )
    
    # Caso 1: Utilizzo del token di test da Swagger UI
    if token == MOCK_TOKEN:
        return MOCK_USER
    
    # Caso 2: Utilizzo del token Firebase
    try:
        # Verifica del token Firebase
        decoded_token = verify_firebase_token(token)
        
        if not decoded_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token di autenticazione non valido"
            )
            
        # Estrazione dell'user_id dal token decodificato
        user_id = decoded_token.get("uid")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenziali di autenticazione non valide"
            )
            
        # Restituzione delle informazioni utente
        return {
            "user_id": user_id,
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name")
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Errore di autenticazione: {str(e)}"
        )
