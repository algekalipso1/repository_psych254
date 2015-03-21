library(dplyr)
library(tidyr)

#install.packages('ggplot2')
library(ggplot2)

install.packages('binom')
library(binom)


#d <- read.csv("pilotB.tsv", header=TRUE, sep="\t", row.names=NULL, stringsAsFactors = FALSE)
d <- read.csv("real_trial.tsv", header=TRUE, sep="\t", row.names=NULL, stringsAsFactors = FALSE)

names(d)
d$Answer.position_chosen_trial
correct <- d$Answer.total_correct

hist(correct, breaks = 15)
mean(correct)
sd(correct)/length(correct)^.5

correct <- data.frame(correct)


s <- sum(correct)
n <- (length(correct))*66

binom.test(s, n, p = 1/3)




df <- NULL

for (i in 1:length(d$Answer.responses)) {
  is_responses <- d$Answer.responses[i]
  is_responses <- substr(is_responses, 2, 132)
  values <- as.integer(strsplit(is_responses, ",")[[1]])
  is_by_trial <- d$Answer.correct_ordered_trials[i]
  is_by_trial <- substr(is_by_trial, 2, 132)
  values_by_trial <- as.integer(strsplit(is_by_trial, ",")[[1]])
  new_row_values <- c(values, values_by_trial)
  df <- rbind(df, new_row_values)
}

# Responses (absolute stimuli names) and responses by trials
vector_names <- c()
for (i in 1:12) {
  cn <- paste("full_set_", as.character(i), sep = "")
  vector_names <- c(vector_names, cn)
}
for (i in 1:12) {
  cn <- paste("local_phase_", as.character(i), sep = "")
  vector_names <- c(vector_names, cn)
}
for (i in 1:12) {
  cn <- paste("magnitude_corr_", as.character(i), sep = "")
  vector_names <- c(vector_names, cn)
}
for (i in 1:12) {
  cn <- paste("marginals_", as.character(i), sep = "")
  vector_names <- c(vector_names, cn)
}
for (i in 1:12) {
  cn <- paste("subband_corr_", as.character(i), sep = "")
  vector_names <- c(vector_names, cn)
}
vector_names <- c(vector_names, "calibration_60_190", "calibration_190_60", "calibration_10_240", "calibration_240_10", "calibration_110_130", "calibration_130_110")

for (i in 1:66) {
  cn <- paste("correct_by_trial_", as.character(i), sep = "")
  vector_names <- c(vector_names, cn)
}

colnames(df) <- vector_names
rownames(df) <- 1:60
df <- as.data.frame(df)

mean(df$calibration_60_190)
mean(df$calibration_190_60)
mean(df$calibration_10_240)
mean(df$calibration_240_10)
mean(df$calibration_110_130)
mean(df$calibration_130_110)


# Add into overall wide array
wide_d <- cbind(d, df)

# Filter by easy
highly_compliant <- df$calibration_190_60 == 1 & df$calibration_60_190 == 1 & df$calibration_10_240 == 1 & df$calibration_240_10 == 1
#highly_compliant <- wide_d$Answer.example_chosen_positions == "[0,2,2,1]"

compliant <- subset(wide_d, highly_compliant)

#wide_d <- compliant

# By trial
by_t <- qplot(x = 1:66, colMeans(wide_d[,112:177]))
by_t + stat_smooth() + xlab("Trial") + ylab("Prob. Correct") +  ggtitle("Proportion correct by trial #")

# By ordered conditions
qplot(x = 1:66, colMeans(wide_d[,46:111]))

# Plot of individual performances
individual_performances <- rowSums(wide_d[,46:105])
wide_d$individual_performances <- individual_performances
individual_performances <- data.frame(individual_performances)
mm <- mean(individual_performances$individual_performances)
qplot(individual_performances, data=individual_performances, geom="histogram", binwidth = 1) +  geom_vline(aes(xintercept=c(20, mm), color = "0000ff")) + ggtitle("Correct out of 60")
sd(individual_performances$individual_performances)
# Test for normalcy. It does not seem normal... maybe there are two underlying strategies used.
shapiro.test(individual_performances$individual_performances)

# Maybe filter top achievers?
# wide_d <- subset(wide_d, wide_d$individual_performances > 22)


# Compute the aggregate performance on conditions
full_sets <- sum(colSums(wide_d[,46:57]))
local_phases <- sum(colSums(wide_d[,58:69]))
magnitude_corrs <- sum(colSums(wide_d[,70:81]))
marginals <- sum(colSums(wide_d[,82:93]))
subband_corrs <- sum(colSums(wide_d[,94:105]))
calibrations <- sum(colSums(wide_d[,106:109]))



# Produce the data for the plot per condition
total_per_condition <- length(wide_d[,1])*12
of_possible = c(total_per_condition, total_per_condition, total_per_condition, total_per_condition, total_per_condition, length(wide_d[,1])*4)
#conditions <- c("marginal", "subband_corr", "magnitude_corr", "local_phase", "full_set", "calibration")
conditions <- c("Marginals", "Raw.Auto.", "Mag.Corr.", "Phase", "Full Set.", "Checks")
corrects =  c(marginals, subband_corrs, magnitude_corrs, local_phases, full_sets, calibrations)
correct_per_condition <- data.frame(conditions = conditions, corrects = corrects, 
                                    of_possible = of_possible)
 

correct_per_condition$means <- correct_per_condition$corrects / correct_per_condition$of_possible

# To order properly
correct_per_condition$conditions2 <- factor(correct_per_condition$conditions, as.character(correct_per_condition$conditions))

# In qplot
means.barplot <- qplot(x = conditions2, y=means,
                       data=correct_per_condition, geom="bar", stat="identity", color = "0000ff") + coord_cartesian(ylim = c(0.3, 1)) + guides(fill = FALSE)

means.barplot + geom_errorbar(aes(ymax=binom.confint(corrects, of_possible, conf.level = 0.95, methods = "bayes")$upper,
                                  ymin=binom.confint(corrects, of_possible, conf.level = 0.95, methods = "bayes")$lower),
                              position=position_dodge(0.9),
                              data=correct_per_condition) + scale_y_continuous(breaks = seq(0.3,1, by = 0.025)) +
  xlab("Statistic removed") + ylab("Probability of correct") +  geom_hline(aes(yintercept=c(0.333333)))


# In ggplot
means.barplot <- ggplot(aes(x = conditions2, y=means, fill = conditions2),
                       data=correct_per_condition,  stat="identity") + coord_cartesian(ylim = c(0.3, 1)) + ggtitle("Replication for Lesion on Structured textures")
means.barplot + geom_bar(stat = "identity", position = "stack") + geom_errorbar(aes(ymax=binom.confint(corrects, of_possible, conf.level = 0.95, methods = "bayes")$upper,
                                  ymin=binom.confint(corrects, of_possible, conf.level = 0.95, methods = "bayes")$lower),
                              position=position_dodge(0.9),
                              data=correct_per_condition) + scale_y_continuous(breaks = seq(0.3,1, by = 0.025)) +
  xlab("Statistic removed") + ylab("Probability of correct") +  geom_hline(aes(yintercept=c(0.333333))) 





# Statistical significance levels
prop.test(c(full_sets, local_phases), c(total_per_condition, total_per_condition))
prop.test(c(full_sets, subband_corrs), c(total_per_condition, total_per_condition))
prop.test(c(local_phases, subband_corrs), c(total_per_condition, total_per_condition))


prop.test(c(magnitude_corrs, full_sets), c(full_sets total_per_condition, total_per_condition))
prop.test(full_sets, total_per_condition, p = 0.33333)
prop.test(local_phases, total_per_condition, p = 0.33333)



sd(wide_d$full_set_3)/length(wide_d$full_set_3)^.5
mean(wide_d$full_set_3)




# Now by either 2 originals, 1 synthetic, or viceversa.
one_o <- 2*(23:52)
two_o <- 2*(23:52) + 1
orig_odd <- sum(colSums(wide_d[,one_o]))
synth_odd <- sum(colSums(wide_d[,two_o]))

l_count <- (length(wide_d[,1]) * 30)
orig_odd / l_count
synth_odd / l_count

prop.test(c(orig_odd, synth_odd), c(l_count, l_count))



# Now try to do a more adequate analysis using tidy data
d.tidy <- subset(wide_d, select = c(workerid, starts_with("full_set")))


# Time they took to answer survey and corresponding pay rate
seconds <- 427.8
minutes <- seconds  / 60
payRate <- 0.7*60/minutes

# Total trials (for 'structured images')
66*60

# Total trials for "structured images" in original study (Balas 2006)
8*2160/3
