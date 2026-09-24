# Dino Junction

Exactly what it sounds like: a train table where the cars are dinosaurs
(or other prehistoric animals).

**Play it here: <https://brezgis.com/dino-train-table/>**

![The table: wooden rails, a lake trestle, a ramp bridge, a mountain tunnel, and trains whose cars are dinosaurs](docs/screenshot.png)

An ambient browser toy. You open the page and you're sitting at a wooden
train table: a couple of trains are already trundling around, and the rest
of the animals wait in the tray at the side. No goals, no score, no settings.

## Quickstart

Plain SVG and one script. No dependencies, no build.

```sh
git clone https://github.com/brezgis/dino-train-table.git
cd dino-train-table
```

Then either open `index.html` straight from disk, or serve the folder with
any static server:

```sh
python3 -m http.server
# → http://localhost:8000
```

## The table

The layout is one you could actually build from a box of wooden track: every
curve is the same standard eighth-of-a-circle piece, every switch is a straight
leg plus one of those curves, and the whole thing closes up exactly. An oval
runs over the lake on a low trestle and through the mountain in a tunnel.
Across the middle, two diagonals make an X; since they meet at right angles,
one climbs a ramp and crosses over the other on a bridge instead of sharing a
flat crossing. Along the bottom, a passing siding makes a two-track station.
Six switches in all.

## Things a hand can do

- **Pick anything up** and put it somewhere else — on a rail, on the felt,
  or back in the tray. The wild dinosaurs grazing on the felt move too.
- **Tap an engine** and its whole train turns around and heads back the
  other way.
- **Tap an animal** and a little caption below the table introduces it.
  Each one chimes its own note when picked up.
- **Tap a switch lever** (the yellow-knobbed pins at the junctions) to choose
  where the track sends the trains.
- Drop cars **behind** an engine and they couple on. Leave them **in front**
  and the engine has to push — too many and it bogs down, puffing hard, and
  after a while gives up and backs away.
- Two trains meeting nose-to-nose will argue about it for a moment.
  The smaller one backs down (unless it's boxed in, then the other one does).
- Trains take turns at the switches: one waits, nose clear of the points,
  while the other goes through. A car left standing on the points gets
  nudged clear.
- A lever flipped under a moving train splits it, and the cars that come
  loose roll on a little way by themselves. This is a feature, as anyone who
  grew up with a wooden train set knows.
- The volcano is mostly dormant. Mostly.

## License

[MIT](LICENSE).
