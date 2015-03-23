## Simple power analysis simulations

### ----------------- ONE EFFECT SIZE ----------------- 
true.mean <- 1
true.sd <- 3
ns <- seq(5,200,5)
num.samps <- 1000

ps <- matrix(nrow=num.samps,ncol=length(ns))
for (i in 1:length(ns)) {
	for (j in 1:num.samps) {
		d <- rnorm(ns[i],true.mean,true.sd)
		ps[j,i] <- t.test(d)$p.val < .05
	}	
}

power <- colMeans(ps)

plot(ns,power,xlab="number of observations",ylim=c(0,1),
	ylab="probability of rejecting H0",bty="n")
	


### ----------------- VARY EFFECT SIZE ----------------- 
true.mean <- 1
ns <- seq(10,120,10)
num.samps <- 100
es <- seq(0.1,1,.1) # effect size

ps <- list()
power <- matrix(nrow=length(es),ncol=length(ns))
for (e in 1:length(es)) {
	true.sd <- true.mean / es[e]  # effect size is SD scaled by mean
	
	ps[[e]] <- matrix(nrow=num.samps,ncol=length(ns))
	
	for (i in 1:length(ns)) {
		for (j in 1:num.samps) {
			d <- rnorm(ns[i],true.mean,true.sd)
			ps[[e]][j,i] <- t.test(d)$p.val < .05
		}	
		power[e,i] <- mean(ps[[e]][,i])
	}
	
}

plot(NA,xlab="number of observations",
	ylab="probability of rejecting H0",bty="n",type="l",ylim=c(0,1),xlim=c(0,120))

for (e in 1:length(es)) {
	lines(ns,power[e,],col=e)	
	text(ends[i] + (ends[i]/15),power[e,ns==ends[i]],es[e],col=e,xpd="n")
}	


### pretty layout
layout(matrix(c(1,2,3,4), 2, 2, byrow = TRUE))
ends <- c(30,60,90,120)
for (i in 1:4) {
	plot(NA,xlab="number of observations",
		ylab="probability of rejecting H0",bty="n",type="l",ylim=c(0,1),xlim=c(10,ends[i]))

	for (e in 1:length(es)) {
		lines(ns[ns<=ends[i]],power[e,ns<=ends[i]],col=e)	
		text(ends[i] + (ends[i]/15),power[e,ns==ends[i]],es[e],col=e,xpd="n")
	}
}		
