'use client';

import Image from 'next/image';
import axios from 'axios';
import { RealtimeSession } from '@openai/agents-realtime';
import { createAgent } from './agents/gf';

export default function Home() {
  async function handleStartAgent() {
    console.log('Making API Call to /api to EK');
    const response = await axios.get('/api');
    console.log(`Got the response from /api`, response.data);

    const tempKey = response.data.tempApiKey;
    console.log({ tempKey });

    const session = new RealtimeSession(await createAgent(), {
      model: 'gpt-realtime',
      config: {
        inputAudioFormat: 'pcm16',
        inputAudioNoiseReduction: { type: 'near_field' },
        inputAudioTranscription: {
          language: 'en',
          model: 'gpt-4o-mini-transcribe',
        },
      },
    });
    await session.connect({ apiKey: tempKey });
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button
        onClick={handleStartAgent}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Start Agent
      </button>
    </div>
  );
}
