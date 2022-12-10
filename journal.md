# Misc notes & thoughts.

I'm in a private leaderboard with some https://www.barracuda.com/ colleagues.

---
## Day 10

Second day in a row that I've used a "simplify things while reading input" approach.

Yesterday had a bunch of instructions like "up 4", "down 3", "left 1." I expanded those early, translating to a simple list of single steps: "up, up, up, up, down, down, down, left."

Same thing today: there was one type of op that took 2 cycles, and the first cycle was effectively a no-op. So I just inserted that as an extra no-op while reading the input.


---
## Day 8

Definitely not elegant.

Had my first "misunderstood the problem" challenge. Multiple layers of it. That's why my part 1 is so needlessly complex. Eventually figured out the gap, and just adjusted my code a bit to follow the right rules. That rendered my optimization ideas useless, but it wasn't worth simplifying the code to get rid of them.

For part two I threw much of that away and started fresh.

In both cases, it really helped to have a simple grid print function. Copied that from last year's code.

---
## Day 6

Grateful for an easy one (and a very easy part 2) after the morning I've had! (Christmas tree fell over last night!)


---
## Day 5

This input makes me wish I'd chosen to do the challenges in Perl this year :)


---
## Day 4

One limit I impose on myself: try not to use any npm modules for solving the puzzle. It makes it a little more interesting to work out some basic stuff, and to learn more of the built-in javascript functions & node idioms.

I've really wished I had some good "set math" functions these past couple days though.


---
## Setup

Copied repo from last year, removed all the input & solution files (kept only 01.1), and removed unused modules.

