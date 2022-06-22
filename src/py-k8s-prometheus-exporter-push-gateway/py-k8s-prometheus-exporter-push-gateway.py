# #############################################################################
# Push Gateway
# #############################################################################
from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
registry = CollectorRegistry()
g = Gauge('py_k8s_prometheus_exporter_push_gateway_gauge_last_time_job', 'Last time a batch job successfully finished', registry=registry)
g = Gauge('job_last_success_unixtime', 'Last time a batch job successfully finished', registry=registry)
g.set_to_current_time()
push_to_gateway('localhost:9091', job='py_k8s_prometheus_exporter_push_gateway_gauge_last_time_job', registry=registry)

# #############################################################################
# Counter
# #############################################################################
from prometheus_client import Counter
c = Counter('py_k8s_prometheus_exporter_push_gateway_counter', 'py_k8s_prometheus_exporter_push_gateway_counter')
c.inc()     # Increment by 1
c.inc(1.6)  # Increment by given value


# #############################################################################
# Gauge
# #############################################################################
from prometheus_client import Gauge
g = Gauge('py_k8s_prometheus_exporter_push_gateway_gauge', 'py_k8s_prometheus_exporter_push_gateway_gauge')
g.inc()      # Increment by 1
g.dec(10)    # Decrement by given value
g.set(4.2)   # Set to a given value

# Some gauge utilities
g.set_to_current_time()   # Set to current unixtime
# Increment when entered, decrement when exited.
@g.track_inprogress()
def f():
	pass

with g.track_inprogress():
	pass


# #############################################################################
# Summary
# #############################################################################
from prometheus_client import Summary
s = Summary('py_k8s_prometheus_exporter_push_gateway_summary', 'py_k8s_prometheus_exporter_push_gateway_summary')
s.observe(4.7)    # Observe 4.7 (seconds in this case)
@s.time()
def f():
	pass

with s.time():
	pass


# #############################################################################
# Histogram
# #############################################################################
from prometheus_client import Histogram
h = Histogram('py_k8s_prometheus_exporter_push_gateway_histogram', 'py_k8s_prometheus_exporter_push_gateway_histogram')
h.observe(4.7)    # Observe 4.7 (seconds in this case)
@h.time()
def f():
	pass

with h.time():
  pass


# #############################################################################
# Info
# #############################################################################
from prometheus_client import Info
i = Info('py_k8s_prometheus_exporter_push_gateway_info', 'py_k8s_prometheus_exporter_push_gateway_info')
i.info({'version': '1.2.3', 'buildhost': 'foo@bar'})


# #############################################################################
# Enum
# #############################################################################
from prometheus_client import Enum
e = Enum('py_k8s_prometheus_exporter_push_gateway_enum', 'py_k8s_prometheus_exporter_push_gateway_enum', states=['starting', 'running', 'stopped'])
e.state('running')


# #############################################################################
# Labels
# #############################################################################
from prometheus_client import Counter
c2 = Counter('py_k8s_prometheus_exporter_push_gateway_counter_http_failures', 'HTTP Failures', ['method', 'endpoint'])
c2.labels('get', '/').inc()
c2.labels('post', '/submit').inc()
c2.labels(method='get', endpoint='/').inc()
c2.labels(method='post', endpoint='/submit').inc()