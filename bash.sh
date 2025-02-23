while true; do  
    # Get the current date and time in IST
    echo "$(date '+%Y-%m-%d %H:%M:%S %Z')" >> /Users/pavankurmakoka/Documents/tutorials/projects/trade-tribe-app/bash.log
    
    # Make the curl request
    curl --location 'https://wagmee-backend-linux-amd64-latest.onrender.com/api/v1/search/user/5' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcklkIjoxLCJzdWIiOiJwYXZhbmtva2ExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDMwNjE0MywiZXhwIjoxNzQwMzQyMTQzfQ.pHG8GvC5qi8HAiUD_elDn-yMMF6SKvBTen4Ujct9DX4
' \
    --header 'Cookie: JSESSIONID=6ED9CE97589DDC7266E1A1D73B87241C' >> /Users/pavankurmakoka/Documents/tutorials/projects/trade-tribe-app/bash.log 2>&1  
    
    # Sleep for 300 seconds
    sleep 300  
done