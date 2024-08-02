# Dynamic Programming

## Characteristics

    - Dynamic Programming is mainly an optimization over recursion.
    - In DP, the problem is broken down into smaller problems & further smaller problems.
    - In DP, as we break the problem smaller, we would encounter overlapping problems and by saving the result (memoization/tabulation) we can eliminate duplicate executions. 

## Techniques to solve DP

### Top Down approach (Memoization)

    - Break the problem into smaller one, if the smaller ones is already solved return the saved result, else evaluate and save the result.

### Bottom up approach (tabulation)

    - Analyze the problem & see what order the problem is solved, and work your way up from the trivial sub problem to the given solution.

