#!/bin/bash

# if server is still running, then stop it
ps -ef | grep "build/libs/project-0.0.1-SNAPSHOT.war" | grep -v grep | awk '{print $2}' | xargs kill -9 2> /dev/null

if [ $? -eq 0 ];then
    echo "Application Stop Success!"
else
    echo "Application Not Running"
fi

# clean build with scan
# Added scan option to see error msg anywhere.
#./gradlew clean build --scan

# restart server deployment file
echo "Application Restart"
echo $1

# nohup executes server on background
nohup java -jar build/libs/project-0.0.1-SNAPSHOT.war --spring.profiles.active=dev > /dev/null 2>&1 &