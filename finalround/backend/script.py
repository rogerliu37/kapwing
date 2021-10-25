"""
    SRT: standard way to share subtitles
    don't need to save to SRT file, just print out SRT formatted 

    1. Make request to the Interview Transcription API, two endpoints
    # returned in JSON format
    # call multiple times to know jobs done
    # maybe call until job is done etc
        # print out messages

        put get post
        get: get data
        put: update 
        post: create
"""
import requests
import json 

url_path = "https://cdn.kapwing.com/samples/5c4231d44d02e3ffa24640d6.mp4"
put_path = "https://interview.kapwing.com/api/transcription?url=" + url_path
r = requests.put(put_path)
jobId = r.json()['jobId']
get_path = "https://interview.kapwing.com/api/transcription?jobId=" + jobId
g = requests.get(get_path)
print(g.json())
# check to see if its pending
# if it is, i'm gonna make another call, 
# if its not, then get the transcription
while g.json()["status"] == "pending":
    print("Video transcription progress: " + str(g.json()["progress"]))
    g = requests.get(get_path)

input_list = json.loads(g.json()["transcription"])
print(input_list)

sequence_number = 1

# 3601 seconds = 1 
def convert_to_srt(seconds):
    hours_string = ""
    minutes_string = ""
    seconds_string = ""
    hours, hours_remainder = divmod(seconds, 3600) 
    minutes, minutes_remainder = divmod(hours_remainder, 60)
    if hours < 10:
        hours_string = "0" + str(hours)
    else:
        hours_string = str(hours)
    if minutes < 10:
        minutes_string = "0" + str(minutes)
    else:
        minutes_string = str(minutes)

    return hours_string + ":" + minutes_string + ":" + str(minutes_remainder)
    
for sequence in input_list:
    print(sequence_number)
    print(convert_to_srt(sequence["startTime"]) + "-->" + convert_to_srt(sequence["endTime"]))
    print(sequence["text"])
    print()
    sequence_number += 1 
