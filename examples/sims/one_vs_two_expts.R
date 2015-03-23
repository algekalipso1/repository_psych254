rm(list=ls())
library(dplyr)
library(ggplot2)

## ----------------- ONE EXPT vs. TWO EXPTS ----------------- 
# simulations from class 2/2 on whether you should run one experiment or two 
# given a fixed sample size

sim <- function (samp, es) {
  full.samp <- rnorm(samp, mean = es)
  full.p <- t.test(full.samp)$p.val < .05
  
  half.samp1 <- full.samp[1:floor(samp/2)]
  half.samp2 <- full.samp[floor(samp/2)+1:samp]
  halves.p <- t.test(half.samp1)$p.val < .05 |
    t.test(half.samp2)$p.val < .05
  
  return(list(full=full.p, halves=halves.p))
}

ns <- seq(20,200,20)
es <- seq(0,.5,.1)
  
d <- data.frame()
for (n in ns) {
  for (e in es) { 
    rs <- replicate(1000, sim(n, e))
    ms <- rowMeans(rs==TRUE)
    d <- bind_rows(d, data.frame(power = ms,
                                 regime = c("full","halves"), 
                                 n=n, 
                                 effect = e))
                   
  }
}

qplot(n, power, facets=~effect,
      col=regime, geom="line", group=regime,
      data=d)

