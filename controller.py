import json
import hashlib
import os

def encrypt(text: str):
    crypt = hashlib.sha256()
    crypt.update(text.encode('utf-8'))
    return crypt.hexdigest()

class User:
    def __init__(self, username, email, password):
        self.id = 0
        self.username = username
        self.email = email
        self.password = encrypt(password)

    def toDict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password
        }

def nextId(users: list):
    if not users:
        return 1
    else:
        ids = []
        for x in users:
            ids.append(x['id'])
        return max(ids) + 1

def writeToJson(data: dict, filename: str):
    path = f'./{filename}'
    os.makedirs(os.path.dirname(path), exist_ok=True)

    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            try:
                existingData = json.load(file)
            except json.JSONDecodeError:
                existingData = []
    else:
        existingData = []

    newId = nextId(existingData)
    data['id'] = newId
    existingData.append(data)

    with open(path, 'w', encoding='utf-8') as file:
        json.dump(existingData, file, indent=4)
    print(f'Usuario "{data['username']}" con id "{data['id']}" guardado en {path}')