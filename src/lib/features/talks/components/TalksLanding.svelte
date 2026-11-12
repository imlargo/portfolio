<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { SiteCta } from '$lib/components/sections';
	import { TALK_STATUS, talkPath, talks, talksPage } from '$lib/content/talks';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
</script>

<section class="px-layout py-hero flex w-full flex-col items-center">
	<div class="max-w-wx flex w-full flex-col gap-y-12">
		<div class="flex flex-col gap-y-4" {@attach useReveal()}>
			<span class="font-mono text-sm text-muted-foreground">{talksPage.eyebrow}</span>

			<!-- El mismo titular a dos tonos que el blog. -->
			<h1 class="ty-h1 max-w-3xl text-muted-foreground">
				{talksPage.title}
				<span class="text-foreground">{talksPage.titleAccent}</span>
			</h1>
		</div>

		{#if talks.length === 0}
			<p class="border-t pt-8 text-muted-foreground">{talksPage.empty}</p>
		{:else}
			<!-- Filas separadas por un filete, como el historial de la home: cada
			     charla es un registro con su ficha técnica a la izquierda. -->
			<ul
				class="flex flex-col divide-y border-y"
				{@attach useReveal({ targets: '.talk-row', stagger: 0.08, y: 24 })}
			>
				{#each talks as talk (talk.slug)}
					<li class="talk-row">
						<a
							href={talkPath(talk.slug)}
							class="group grid grid-cols-1 gap-x-12 gap-y-4 py-8 md:grid-cols-12"
						>
							<div
								class="flex flex-wrap items-center gap-2 font-mono text-sm text-muted-foreground md:col-span-3 md:flex-col md:items-start"
							>
								<span class="text-foreground">{talksPage.kindLabels[talk.kind]}</span>
								<span>{talksPage.languageLabels[talk.language]}</span>
								<span>{talksPage.minutesLabel(talk.minutes)}</span>
								{#if talk.status === TALK_STATUS.draft}
									<span class="rounded-full border px-2 text-xs">{talksPage.draftLabel}</span>
								{/if}
							</div>

							<div class="flex flex-col gap-y-3 md:col-span-9">
								<span class="flex items-start justify-between gap-x-6">
									<h2
										class="ty-h3 text-pretty transition-colors duration-500 group-hover:text-foreground/70"
									>
										{talk.title}
									</h2>
									<ArrowUpRight
										class="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
									/>
								</span>
								<p class="max-w-prose text-pretty text-muted-foreground">{talk.description}</p>
								<p
									class="flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted-foreground"
								>
									<span>{talk.audience}</span>
									{#each talk.topics as topic (topic)}
										<span class="text-muted-foreground/40" aria-hidden="true">·</span>
										<span>{topic}</span>
									{/each}
								</p>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-12" {@attach useReveal({ y: 24 })}>
			<span class="font-mono text-sm text-muted-foreground md:col-span-3">
				{talksPage.mentoring.title}
			</span>
			<div class="flex flex-col items-start gap-y-4 md:col-span-9">
				<p class="max-w-prose text-lg text-pretty">{talksPage.mentoring.description}</p>
				<Button variant="outline" href="mailto:{siteContent.email}">
					{talksPage.mentoring.cta}
				</Button>
			</div>
		</div>
	</div>
</section>

<SiteCta />
