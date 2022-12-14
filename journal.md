# Misc notes & thoughts.

I'm in a private leaderboard with some https://www.barracuda.com/ colleagues.

---
## Day 11

Probably my last day for 2022.

Back on Nov 30, I thought about skipping this year's challenge altogether. The AOC start happened to coincide with the final day of a huge home renovation project. I did 40+ hours/week of plumbing, drywall, electric, painting, flooring, etc. over the last nine months. Still have work to do on that, but I pushed myself to the brink of burnout and I settled on a specific target (bathroom tile done) before taking a couple-month winter break.

Now we're in the stretch where some problems take all night to figure out, and I'm just not enjoying it.

Committing a working part 1 solution and a couple abandoned attempts at part 2. I'm sure there's some math trick I'm missing for part 2, but I didn't want to google spoilers.

---
## Day 10

Second day in a row that I've used a "simplify things while reading input" approach.

Yesterday had a bunch of instructions like "up 4", "down 3", "left 1." I expanded those early, translating to a simple list of single steps: "up, up, up, up, down, down, down, left."

Same thing today: there was one type of op that took 2 cycles, and the first cycle was effectively a no-op. So I just inserted that as an extra no-op while reading the input.

This allowed me to keep the main processing code a bit simpler and easier to understand.

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

