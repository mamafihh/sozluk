from  website import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="192.168.1.67", port=55555)

