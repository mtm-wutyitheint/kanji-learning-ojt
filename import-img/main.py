import requests 


def InsertBlob(filepath):
    with open(filepath, "rb") as File:
        files = {'files': ('12.png', open(filepath, 'rb'), 'image', {'uri': ''})}
        response = requests.post('http://localhost:1337/upload', files=files).json()
        payload = {
            "logoPicture": response[0]['id']
        }
        response = requests.put('http://localhost:1337/kanjis/229', json=payload)
        print(response.status_code)


UserFilePath = input("Enter File Path: ")
InsertBlob(UserFilePath)
