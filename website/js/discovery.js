function startupDiscovery() {
    AbortSignal.timeout ??= function timeout(ms) {
        const ctrl = new AbortController()
        setTimeout(() => ctrl.abort(), ms)
        return ctrl.signal
    }
    document.getElementById("subnet-input").value = "192.168.0";
}

function startDiscovery() {
    document.getElementById("discovery-start").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i> Searching';
    discoverDevice()
    .then(devices => {
        console.clear()
        const foundDevices = devices.filter(device => device !== null);
        console.log('Devices found:', foundDevices);
        console.log("discovery done");
        try{
            console.log("Device ip: " + foundDevices[0]["ip"]);
        }
        catch{
            console.log("No device found");
            sendAlert("error","No device found on the network")
        }
        sendAlert("main","connected to robot-arm ip: " + foundDevices[0]["ip"])
        document.getElementById("discovery-start").innerHTML = "SEND";

        deviceIp = foundDevices[0]["ip"];
    
        startup();
    })
    .catch(error => {
        console.error('Error discovering devices:', error);
        document.getElementById("discovery-start").innerHTML = "SEND";
    });

}

async function discoverDevice() {
    const requests = [];
    subnet = document.getElementById('subnet-input').value;
    console.log(subnet);
    for (let i = 1; i <= 255; i++) {
        const ip = `${subnet}.${i}`;
        try{
        const requestPromise = fetch(`http://${ip}:80/discovery`, { signal: AbortSignal.timeout(5000) })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Failed to fetch from ${ip}`);
                }
            })
            .then(data => {
                if (data === 'robot-arm') {
                    return { ip, data };
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null; // Ignore errors (e.g., timeouts, network errors)
            });

        requests.push(requestPromise);
        } catch{
            return null;
        }
    }

    return Promise.all(requests);
}

// Usage
