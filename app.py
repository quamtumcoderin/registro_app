from flask import Flask, render_template, request, jsonify
import controller

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def createAccount():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    user = controller.User(username, email, password)

    controller.writeToJson(user.toDict(), 'data.json')

    return jsonify({'success': True, 'message': 'Usuario registrado correctamente.'})

if __name__ == '__main__':
    app.run(debug=True)