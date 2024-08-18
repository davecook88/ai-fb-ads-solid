import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { createStore } from "solid-js/store";
import { FacebookCampaign } from "./fb/campaigns";

export default function App() {
  const [store, setStore] = createStore<{
    selectedCampaignId: string | null;
    campaigns: FacebookCampaign[];
  }>({
    selectedCampaignId: null,
    campaigns: [],
  })
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
