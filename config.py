DEBUG = True

USERNAME = 'postgres'
PASSWORD = 'AGGGAGg4Ege*fEe*GGDFgA142f46C163'
SERVER = 'roundhouse.proxy.rlwy.net'
PORT = '15076'
DB = 'railway'

SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{USERNAME}:{PASSWORD}\
@{SERVER}:{PORT}/{DB}"

SQLALCHEMY_TRACK_MODIFICATIONS = True

JWT_SECRET_KEY = '0cfd30fbcd233d60b8c10a396ec2fe05559d7\
ad085470e755b3342c87f3cda5a'

JWT_ACCESS_TOKEN_EXPIRES = 3600

