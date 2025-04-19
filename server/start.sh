#!/usr/bin/env sh

echo "Starting backend server..."
(cd backend && npm start) &
if [ $? -ne 0 ]; then
    echo "出现未知错误"
fi


echo "Starting frontend server..."
(cd frontend && http-server) &
if [ $? -ne 0 ]; then
    echo "Some thing wrong"
    echo "You had better run "
    echo "sudo npm install -g http-server"
fi
