import requests
import os


def InsertBlob(filepath):
    for path in os.listdir(filepath):
        data_path = os.path.join(filepath, path)
        print(path)
        URL = 'http://localhost:1337'
        uploadURL = f'{URL}/upload'
        kanjiURL = f'{URL}/kanjis'
        PARAMS = {'kanji': path}
        r = requests.get(url=kanjiURL, params=PARAMS).json()

        img_path = os.path.join(filepath, path, os.listdir(data_path)[0])
        img_path02 = os.path.join(filepath, path, os.listdir(data_path)[1])

        file01 = {'files': (f'{path}1.png', open(img_path, 'rb'), 'image', {'uri': ''})}
        response01 = requests.post(url=uploadURL, files=file01).json()

        file02 = {'files': (f'{path}2.png', open(img_path02, 'rb'), 'image', {'uri': ''})}
        response02 = requests.post(url=uploadURL, files=file02).json()

        payload = {
            "logoPicture": response01[0]['id'],
            "examplePicture": response02[0]['id']
        }
        imgid = r[0]['id']
        response = requests.put(f'{kanjiURL}/{imgid}', json=payload)
        print(response.status_code)


UserFilePath = input("Enter File Path: ")  # D:\JPLEarningOJT\japanese_learning_game\import-img\imgs
InsertBlob(UserFilePath)
