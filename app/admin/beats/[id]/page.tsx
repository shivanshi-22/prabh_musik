"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Copy, Trash2, FileText, Download, Music, Disc3 } from "lucide-react"

import { useBeat, useDeleteBeat, useDuplicateBeat } from "../../../../hooks/useBeats"
import { mockArtists } from "../../../../mock/artists"
import { PageHeader } from "../../../../components/admin/PageHeader"
import { Button } from "../../../../components/ui/button"
import { StatusBadge } from "../../../../components/admin/StatusBadge"
import { BeatMetadataCard } from "../../../../components/admin/beats/BeatMetadataCard"
import { BeatPricingCard } from "../../../../components/admin/beats/BeatPricingCard"
import { BeatAnalyticsCard } from "../../../../components/admin/beats/BeatAnalyticsCard"
import { BeatOwnershipCard } from "../../../../components/admin/beats/BeatOwnershipCard"
import { BeatAudioPlayer } from "../../../../components/admin/beats/BeatAudioPlayer"
import { ConfirmDialog } from "../../../../components/admin/ConfirmDialog"
import { LoadingSkeleton } from "../../../../components/admin/LoadingSkeleton"
import { Card, CardContent } from "../../../../components/ui/card"

export default function BeatDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const beatId = Array.isArray(id) ? id[0] : id

  const { data: beat, isLoading, error } = useBeat(beatId || "")
  const deleteBeatMutation = useDeleteBeat()
  const duplicateBeatMutation = useDuplicateBeat()

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)

  const handleDuplicate = () => {
    if (!beatId) return
    duplicateBeatMutation.mutate(beatId, {
      onSuccess: () => {
        router.push("/admin/beats")
      }
    })
  }

  const handleDelete = () => {
    if (!beatId) return
    deleteBeatMutation.mutate(beatId, {
      onSuccess: () => {
        router.push("/admin/beats")
      }
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-32 bg-neutral-800 rounded"></div>
        <div className="h-16 w-full bg-neutral-800 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-[250px] bg-neutral-800 rounded-xl"></div>
          <div className="h-[250px] bg-neutral-800 rounded-xl"></div>
          <div className="h-[250px] bg-neutral-800 rounded-xl"></div>
        </div>
      </div>
    )
  }

  if (error || !beat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Track Not Found</h2>
        <p className="text-neutral-400 max-w-sm">The beat you are looking for does not exist or has been removed.</p>
        <Link href="/admin/beats">
          <Button>Back to Beats</Button>
        </Link>
      </div>
    )
  }

  const artist = mockArtists.find(a => a.id === beat.artistId)

  return (
    <div className="relative space-y-8 animate-in fade-in duration-500">
      {/* Ambient Glow */}
      <div className="absolute top-[-100px] right-[-100px] h-[500px] w-[500px] bg-gradient-to-b from-accent/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/beats">
            <Button variant="ghost" size="icon" className="size-8 rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <span className="text-sm font-medium text-neutral-500">Back to Beats</span>
        </div>

        {/* Header Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/beats/${beatId}/edit`}>
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Edit size={13} />
              Edit Track
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDuplicate}
            disabled={duplicateBeatMutation.isPending}
            className="gap-2 text-xs"
          >
            <Copy size={13} />
            Duplicate
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDeleteOpen(true)}
            disabled={deleteBeatMutation.isPending}
            className="gap-2 text-xs border-red-500/10 text-red-400 hover:bg-red-500/5 hover:border-red-500/20 hover:text-red-300"
          >
            <Trash2 size={13} />
            Delete
          </Button>
        </div>
      </div>

      {/* Cover and details header panel */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-card-border pb-8">
        <div className="h-32 w-32 rounded-xl bg-neutral-900 border border-card-border overflow-hidden flex items-center justify-center shrink-0 shadow-lg shadow-black/30">
          {beat.assets.coverImage ? (
            <img src={beat.assets.coverImage} alt="Cover" className="h-full w-full object-cover" />
          ) : (
            <Disc3 size={40} className="text-neutral-600" />
          )}
        </div>
        <div className="flex-1 text-center md:text-left space-y-2 mt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">{beat.title}</h1>
            <div className="w-fit mx-auto md:mx-0">
              <StatusBadge status={beat.status} />
            </div>
          </div>
          <p className="text-neutral-400 text-sm font-semibold">By {artist ? artist.stageName : "Unknown Artist"}</p>
          {beat.description && (
            <p className="text-neutral-500 text-sm max-w-2xl pt-1 leading-relaxed">{beat.description}</p>
          )}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (Audio player + Metadata) */}
        <div className="lg:col-span-2 space-y-6">
          {beat.assets.previewAudio && (
            <BeatAudioPlayer 
              audioUrl={beat.assets.previewAudio} 
              title={beat.title} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BeatMetadataCard beat={beat} />
            <BeatOwnershipCard beat={beat} />
          </div>

          {/* Deliverables/Files Section */}
          <Card className="shadow-md">
            <div className="px-6 py-4 border-b border-card-border">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Asset Files & Deliverables</h3>
            </div>
            <CardContent className="p-0 divide-y divide-card-border">
              <div className="flex items-center justify-between p-4 px-6 hover:bg-neutral-900/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Music className="text-neutral-500 size-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-200">Preview Audio File</span>
                    <span className="text-xs text-neutral-500 font-mono mt-0.5">{beat.assets.previewAudio || "Not uploaded"}</span>
                  </div>
                </div>
                {beat.assets.previewAudio && (
                  <a href={beat.assets.previewAudio} download className="text-neutral-400 hover:text-white transition-colors">
                    <Download size={16} />
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between p-4 px-6 hover:bg-neutral-900/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Music className="text-neutral-500 size-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-200">Purchasable WAV File</span>
                    <span className="text-xs text-neutral-500 font-mono mt-0.5">{beat.assets.wavFile || "Not uploaded"}</span>
                  </div>
                </div>
                {beat.assets.wavFile && (
                  <button className="text-neutral-400 hover:text-white transition-colors">
                    <Download size={16} />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 px-6 hover:bg-neutral-900/10 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="text-neutral-500 size-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-200">Track Stems (ZIP)</span>
                    <span className="text-xs text-neutral-500 font-mono mt-0.5">{beat.assets.stemsFile || "Not uploaded"}</span>
                  </div>
                </div>
                {beat.assets.stemsFile && (
                  <button className="text-neutral-400 hover:text-white transition-colors">
                    <Download size={16} />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column (Pricing + Performance stats) */}
        <div className="space-y-6">
          <BeatPricingCard beat={beat} />
          <BeatAnalyticsCard beat={beat} />
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Beat"
        description="Are you sure you want to delete this track? This action will permanently wipe the track files and sales records from the database catalog."
        confirmLabel="Delete Track"
        isDestructive
      />
    </div>
  )
}


