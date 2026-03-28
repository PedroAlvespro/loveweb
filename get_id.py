import urllib.request
import re

html = urllib.request.urlopen('https://www.youtube.com/results?search_query=marcelo+jeneci+pra+sonhar').read().decode('utf-8')
video_ids = re.findall(r'"videoId":"(.*?)"', html)
if video_ids:
    print(video_ids[0])
else:
    print('Not found')
