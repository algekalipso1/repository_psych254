## from http://stackoverflow.com/questions/12064007/factor-order-within-faceted-dotplot-using-ggplot2
rm(list=ls())
library(ggplot2)
library(dplyr)
d <- read.csv("data/medals.csv")

## no ordering
quartz()
qplot(x = count, y = country, data = d, 
      geom = "point", 
      facets = medal.type ~.)

## ordering across facets
quartz()
ms <- d %>% group_by(country) %>% summarise(count = sum(count))
d$country <- factor(d$country, 
                    levels = levels(ms$country)[order(ms$count, decreasing=FALSE)])
                                   
qplot(x = count, y = country, data = d, 
      geom = "point", 
      facets = medal.type ~.)

## ordering within facets
d$medal.type <- factor(d$medal.type, 
                       levels = c("gold","silver","bronze"))

d$country_l <- paste(d$country, d$medal.type, sep = "_") # Make every country unique

quartz()
qplot(x = count, y = reorder(country_l, count), 
      data = d, geom = "point") + 
  facet_grid(medal.type ~., scales = "free_y") + 
  scale_y_discrete("Country", breaks = d$country_l, 
                   label = d$country)

