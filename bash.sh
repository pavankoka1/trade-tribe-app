while true; do  
    # Get the current date and time in IST
    echo "$(date '+%Y-%m-%d %H:%M:%S %Z')" >> /Users/pavankurmakoka/Documents/tutorials/projects/trade-tribe-app/bash.log
    
    # Make the curl request
    curl --location 'https://wagmee-backend-linux-amd64-latest.onrender.com/api/v1/search/user/5' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJwYXZhbmtva2exQGdtYWlsLmNvbSIsImlhdCI6MTczOTkzOTkwNiwiZXhwIjoxNzM5OTc1OTA2fQ.LlFqxIUH4_R7MDt1gBcH8Sz3VeAThtSVfs9ha9ojarE' \
    --header 'Cookie: JSESSIONID=6ED9CE97589DDC7266E1A1D73B87241C' >> /Users/pavankurmakoka/Documents/tutorials/projects/trade-tribe-app/bash.log 2>&1  
    
    # Sleep for 300 seconds
    sleep 300  
done