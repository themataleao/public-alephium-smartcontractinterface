reload = True
# https://github.com/benoitc/gunicorn/blob/master/examples/example_config.py
bind = ":5001"
# Use one worker for GPU models
workers = 1
threads = 1
# You can use multiple threads
timeout = 1500
errorlog = "-"
loglevel = "info"
accesslog = "-"
