/**
 * The studio's light: a fixed layer of soft colour behind the whole page.
 *
 * The hero sets a warm amber-to-violet mood; instead of every section painting
 * its own background (and drifting into cold, unrelated colours), this one
 * layer carries that light down the page. Its five pools of colour move and
 * fade with the scroll position (`animation-timeline: scroll(root)` in
 * globals.css), so the tint shifts from amber through coral and rose to violet
 * and back to amber at the sponsor section, always within the brand's warmth.
 *
 * Only `transform` and `opacity` animate, so the compositor does the work. Each
 * pool is a small element scaled up: a soft gradient loses nothing when scaled,
 * and a small layer keeps GPU memory low. Without scroll-driven animations, or
 * with reduced motion, the pools simply stay where they are.
 */
export function StudioLight() {
  return (
    <div aria-hidden className="studio-light">
      <span className="studio-light__pool studio-light__pool--amber" />
      <span className="studio-light__pool studio-light__pool--coral" />
      <span className="studio-light__pool studio-light__pool--rose" />
      <span className="studio-light__pool studio-light__pool--violet" />
      <span className="studio-light__pool studio-light__pool--teal" />
      <span className="studio-light__grain" />
    </div>
  );
}
