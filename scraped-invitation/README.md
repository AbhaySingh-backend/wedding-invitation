# Local invitation

The published invitation is available at
<https://abhaysingh-backend.github.io/wedding-invitation/>.

Run `node serve.mjs` from this folder, then open <http://127.0.0.1:4173/>.
The local server serves the saved page and restores interactions that do not
work when the HTML is opened directly as a `file://` URL.

The invitation page supports its cover, section shortcuts, countdown, event
calendar downloads, WhatsApp replies, sharing, family details, and gallery
controls. This sample has no music track; its Hindi translation is not part of
the downloaded page. “Try with your names” and the design CTA open Sadar
Nimantran’s original service because its account and invitation editor require
that website's backend. The top sample banner, closing design/share button
block have been removed. The closing attribution remains visible above the
fixed shortcut bar with extra bottom spacing.

The local server omits the source page's external JavaScript bundles and
analytics; the saved HTML and styles remain, with local interaction handlers.
