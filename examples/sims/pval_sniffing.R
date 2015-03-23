rm(list = ls())

#### pvalue sniffing ####
n.samps <- 1000
n.obs <- 50

## first no sniffing
no.sniff <- array(dim=n.samps)
for (i in 1:n.samps) {
	x <- rnorm(n.obs)
	no.sniff[i] <- t.test(x)$p.val < .05
}
mean(no.sniff)

## next with sniffing every subject, starting at 20
sniff <- array(dim=n.samps)
for (i in 1:n.samps) {
	x <- rnorm(n.obs)
	
	j <- 20
	while (j < n.obs) {
		samp <- x[1:j]
		sniff[i] <- t.test(samp)$p.val < .05
		if (sniff[i]) {
			break
		} else {	
			j <- j + 1
		}
	}
}
mean(sniff)

## next with sniffing every subject, starting at 20
intervals <- c(1,5,10,20)
sniff.int <- matrix(nrow=n.samps,ncol=length(intervals))

for (k in 1:length(intervals)) {
	for (i in 1:n.samps) {
		x <- rnorm(n.obs)
		
		j <- 20
		while (j <= n.obs) {
			samp <- x[1:j]
			sniff.int[i,k] <- t.test(samp)$p.val < .05
			if (sniff.int[i,k]) {
				break
			} else {	
				j <- j + intervals[k]
			}
		}
	}
}


colMeans(sniff.int)
plot(intervals,colMeans(sniff.int),type="b",bty="n",
	ylim=c(0,.2),xlab="interval between sniffs",xlim=c(0,20),
	ylab="false positive rate")
lines(c(0,30),c(.05,.05),lty=2,col=2)
text(intervals,colMeans(sniff.int)+.02,colMeans(sniff.int),xpd="n")


## try sniffing with a doubling rule 
## (interesting - has a .08 from .05 inflation every sample) 
n.obs <- 192
sniff <- array(dim=n.samps)
n.success <- array(dim=n.samps)
for (i in 1:n.samps) {
  x <- rnorm(n.obs)
  
  j <- 96
  while (j <= n.obs) {
    samp <- x[1:j]
    sniff[i] <- t.test(samp)$p.val < .05
    if (sniff[i]) {
      n.success[i] <- j
      break
    } else {	
      j <- j * 2
    }
  }
}
mean(sniff)
