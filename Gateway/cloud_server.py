# IMPORT-AS-MANY-PACKAGES-AS-YOU-NEED
import sys
from urllib import response
import requests
# IMPORT-AS-MANY-FUNCTIONS-AS-YOU-NEED

# Server IP Address
SERVER_IP = 'http://192.168.43.37'
PORT_NUMBER = 8080
URL = SERVER_IP + ':' + str(PORT_NUMBER)


def check_server():
    pass


def send_data(msg, node_id):
    data = msg.split('/')

    for i in range(0, len(data), 2):
        if data[i] == 'TC':
            sended_data = {'value': data[i+1], 'nodeId': node_id}
            response = requests.post(URL + '/temperature', sended_data)
            print(response.status_code)
        elif data[i] == 'HU':
            sended_data = {'value': data[i+1], 'nodeId': node_id}
            response = requests.post(URL + '/humidity', sended_data)
            print(response.status_code)
        pass


def main(ldata, pdata, rdata, tdata, gwid):
    arr = map(int, pdata.split(','))
    dst = arr[0]
    ptype = arr[1]
    src = arr[2]
    seq = arr[3]
    datalen = arr[4]
    SNR = arr[5]
    RSSI = arr[6]

    arr = map(int, rdata.split(','))
    bw = arr[0]
    cr = arr[1]
    sf = arr[2]

    # DO-WHATEVER-YOU-NEED-TO-DO-FOR-DATA-UPLOADING
    # USE-PARAMETERS-AS-YOU-NEED
    send_data(ldata, src)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
