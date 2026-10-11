import { useState, type FormEvent } from 'react';
import { Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { city, coupleDisplayName, weddingDateLabel } from '@/lib/wedding';

export function WeddingRSVP({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `RSVP — ${coupleDisplayName}\nName: ${data.get("name")}\nAttendance: ${data.get("attendance")}\nGuests: ${data.get("guests")}\nMessage: ${data.get("message")}\nWedding: ${weddingDateLabel}, ${city}`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding-rsvp.txt";
    link.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        setSaved(false);
      }}
    >
      <DialogContent className="rsvp-dialog">
        <DialogHeader>
          <span className="eyebrow">YOUR PRESENCE IS OUR GIFT</span>
          <DialogTitle className="font-display text-4xl text-primary">
            Celebrate with us
          </DialogTitle>
          <DialogDescription>
            {weddingDateLabel} · {city}
          </DialogDescription>
        </DialogHeader>
        {saved ? (
          <div className="py-6 text-center">
            <Heart className="mx-auto mb-4 text-primary" />
            <h3 className="font-display text-3xl">Your RSVP is ready</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Your response has been downloaded. Please share it with the family
              coordinator to confirm your attendance.
            </p>
            <Button className="mt-6" onClick={() => onOpenChange(false)}>
              With love, thank you
            </Button>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="form-label">
              Your name
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Full name"
                maxLength={100}
              />
            </label>
            <label className="form-label">
              Will you join us?
              <select name="attendance">
                <option>Joyfully attending</option>
                <option>Regretfully unable to attend</option>
              </select>
            </label>
            <label className="form-label">
              Number of guests, including you
              <input
                name="guests"
                type="number"
                min="1"
                max="20"
                defaultValue="1"
                required
              />
            </label>
            <label className="form-label">
              A note for the couple
              <textarea
                name="message"
                rows={3}
                maxLength={1000}
                placeholder="Send a little love…"
              />
            </label>
            <Button type="submit" className="h-11">
              <Download /> Save my RSVP
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Share your saved response with the family to confirm.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
