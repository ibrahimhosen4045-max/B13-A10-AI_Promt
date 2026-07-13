"use client";

import Loader from "@/app/loading";
import { useState } from "react";


export default function AppLoader({ children }) {

  const [loading, setLoading] = useState(true);

  return (
    <>
      {
        loading && (
          <Loader 
            onComplete={() => setLoading(false)}
          />
        )
      }

      {children}
    </>
  );
}