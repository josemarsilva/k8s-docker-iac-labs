kubectl top pod

livenessProbe:
	httpGet:
		path: /health
		port: 8080
	initialDelaySeconds: 3
	periodSeconds: 3
	timeoutSeconds: 2
	successThreshould: 1
	failureThreshould: 1
readynessProbe:
	httpGet:
		path: /ready
		port: 8080
	initialDelaySeconds: 3
	periodSeconds: 3
	timeoutSeconds: 2
	successThreshould: 1
	failureThreshould: 1
