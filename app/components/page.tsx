"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export default function ComponentsPage() {
  const [open, setOpen] = useState(false);
  const { show } = useToast();

  return (
    <div className="min-h-screen font-sans p-8 pb-28">
      <header className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold heading-gradient">Glassy UI Kit</h1>
          <span className="glass-badge">Dark • Glassmorphism</span>
        </div>
        <p className="mt-2 text-white/70 max-w-2xl">A small set of reusable, glassy UI components styled with Tailwind CSS. Dark theme only.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Default, primary, danger, and ghost variants in multiple sizes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Default sm</Button>
              <Button>Default md</Button>
              <Button size="lg">Default lg</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">Primary sm</Button>
              <Button variant="primary">Primary md</Button>
              <Button variant="primary" size="lg">Primary lg</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="danger" size="sm">Danger sm</Button>
              <Button variant="danger">Danger md</Button>
              <Button variant="danger" size="lg">Danger lg</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" size="sm">Ghost sm</Button>
              <Button variant="ghost">Ghost md</Button>
              <Button variant="ghost" size="lg">Ghost lg</Button>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" onClick={() => show({ title: "Saved", description: "Your changes have been saved.", type: "success" })}>Toast Success</Button>
              <Button variant="danger" onClick={() => show({ title: "Error", description: "Something went wrong.", type: "error" })}>Toast Error</Button>
              <Button onClick={() => show({ title: "Heads up", description: "This is a neutral toast." })}>Toast Default</Button>
              <Button onClick={() => show({ title: "Warning", description: "Check your inputs.", type: "warning" })}>Toast Warning</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Text inputs, select dropdown, and checkboxes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-white/60">Email</label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-white/60">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-white/60">Country</label>
                <Select defaultValue="us">
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" className="scale-110" defaultChecked />
                  Remember me
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input type="radio" name="plan" className="scale-110" defaultChecked />
                  Pro
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input type="radio" name="plan" className="scale-110" />
                  Basic
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="primary">Submit</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>Use cards to group related content with glassy elevation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-white/60">Project</div>
                      <div className="font-semibold">Aurora {i + 1}</div>
                    </div>
                    <span className="glass-badge">Active</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">A short description of the item goes here to explain the content.</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-1 w-2/3 rounded-full bg-white/10">
                      <div className="h-1 rounded-full bg-cyan-300/60" style={{ width: `${30 + i * 10}%` }} />
                    </div>
                    <Button size="sm" variant="ghost">Open</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
            <CardDescription>A basic, accessible modal with overlay and escape-to-close.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/75">Click to open the modal and see the glassy overlay.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
          </CardFooter>
        </Card>
      </main>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        This is a glassy modal dialog. It supports closing on overlay click and Escape key.
      </Modal>
    </div>
  );
}



