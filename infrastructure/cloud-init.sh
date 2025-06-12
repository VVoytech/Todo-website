#!/bin/bash
apt-get update
apt-get install -y docker.io docker-compose
usermod -aG docker azureuser
systemctl enable docker
systemctl start docker
