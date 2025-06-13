# Deployment

## Live URLs

Live URL for frontend

```bash
http://35.178.81.153:3000/
```

Live URL for backend

```bash
http://35.178.81.153:4000/graphql
```

## Database Setup

### 1. Launching and Configuring Your EC2 Instance

1. Log in to AWS services and select EC2.
2. Configure the instance name and the OS image as follows
3. Scroll down and configure the instance type and key pair
4. Create a security group
5. Modify to disk size as 20 GB
6. Check the Summary and click Launch instance (right pane) under the Summary section to launch your EC2 instance.
7. Access Your EC2 Instance

### 2. Update Amazon Linux 2023 Packages

```bash
sudo dnf update
```

### 3. Installing PostgreSQL

```bash
sudo dnf install postgresql15.x86_64 postgresql15-server -y
```

### 4. Initializing PostgreSQL Database

```bash
sudo postgresql-setup --initdb
```

### 5. Starting and Enabling PostgreSQL Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
```

### 6. Configure PostgreSQL

1. Set password for ssh postgres user and admin postgres database password

```bash

sudo passwd postgres

su - postgres

psql -c "ALTER USER postgres WITH PASSWORD 'your-password';"
exit
```

2. Primary Configuration File

```bash
sudo vi /var/lib/pgsql/data/postgresql.conf
```

By default, PostgreSQL only listens to localhost

```bash
listen_addresses = 'localhost'
```

if you want to listen all IP addresses:

```bash
listen_addresses = '*' # what IP address(es) to listen on;
```

3. Authentication

```bash
sudo vi /var/lib/pgsql/data/pg_hba.conf
sudo sed -i 's/ident$/md5/' /var/lib/pgsql/data/pg_hba.conf
sudo systemctl restart postgresql
```

4. How to Create a User & Database

```bash
# Connect to the PostgreSQL server as the Postgres user:
sudo -i -u postgres psql

# Create a new database user:
CREATE USER yourusername WITH PASSWORD 'password';

# Create a new database:
CREATE DATABASE database_name;

# Grant all privileges on the database to the user:
GRANT ALL PRIVILEGES ON DATABASE database_name TO yourusername;

# To list all available PostgreSQL users and databases:
\l
```

### 6. Accessing the Database

```bash
psql -h localhost -U username -d database_name
```

## Environment Variables

Enviroment variables for frontend

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=graphql-api-endpoint
```

Enviroment variables for backend

```bash
DATABASE_HOST=db-host
DATABASE_PORT=db-port
DATABASE_USER=db-user
DATABASE_PASSWORD=db-password
DATABASE_NAME=db-name
PORT=backend-port
FRONT_END_PORT=frotend-url
```
