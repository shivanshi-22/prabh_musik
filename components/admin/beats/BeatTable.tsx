"use client"

import * as React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Edit, Trash2, Copy, MoreHorizontal } from "lucide-react"

import { Beat } from "../../../types/admin"
import { mockArtists } from "../../../mock/artists"
import { DataTable } from "../DataTable"
import { StatusBadge } from "../StatusBadge"
import { Button } from "../../ui/button"
import { ConfirmDialog } from "../ConfirmDialog"
import { useDeleteBeat, useDuplicateBeat } from "../../../hooks/useBeats"

interface BeatTableProps {
  beats: Beat[];
}

export function BeatTable({ beats }: BeatTableProps) {
  const deleteBeatMutation = useDeleteBeat()
  const duplicateBeatMutation = useDuplicateBeat()

  const [beatToDelete, setBeatToDelete] = React.useState<string | null>(null)
  const [activeDropdownId, setActiveDropdownId] = React.useState<string | null>(null)

  const handleDeleteConfirm = () => {
    if (beatToDelete) {
      deleteBeatMutation.mutate(beatToDelete)
      setBeatToDelete(null)
    }
  }

  const handleDuplicate = (id: string) => {
    duplicateBeatMutation.mutate(id)
    setActiveDropdownId(null)
  }

  const columns: ColumnDef<Beat>[] = [
    {
      id: "cover",
      header: "Cover",
      cell: ({ row }) => {
        const cover = row.original.assets.coverImage
        return (
          <div className="h-10 w-10 rounded-md bg-neutral-900 border border-card-border overflow-hidden flex items-center justify-center shrink-0">
            {cover ? (
              <img src={cover} alt="Cover" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[10px] text-neutral-600 font-bold font-mono">NO IMG</span>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "title",
      header: "Beat Name",
      cell: ({ row }) => (
        <span className="font-semibold text-neutral-100">{row.original.title}</span>
      )
    },
    {
      id: "artist",
      header: "Artist",
      cell: ({ row }) => {
        const artist = mockArtists.find(a => a.id === row.original.artistId)
        return <span>{artist ? artist.stageName : "Unknown Artist"}</span>
      }
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => (
        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-card-border text-xs text-neutral-400 font-mono">
          {row.original.genre}
        </span>
      )
    },
    {
      accessorKey: "bpm",
      header: "BPM",
      cell: ({ row }) => <span className="font-mono">{row.original.bpm}</span>
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span className="font-mono text-primary font-semibold">${row.original.price.toFixed(2)}</span>
    },
    {
      accessorKey: "status",
      header: "Selling Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => (
        <span className="text-neutral-500 font-mono text-xs">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id
        const isOpen = activeDropdownId === id

        return (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveDropdownId(isOpen ? null : id)}
              className="h-8 w-8 text-neutral-400 hover:text-neutral-100"
            >
              <MoreHorizontal size={16} />
            </Button>
            
            {isOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setActiveDropdownId(null)}
                />
                <div className="absolute right-0 mt-1 w-36 rounded-md border border-card-border bg-card p-1 shadow-xl z-20 animate-in fade-in slide-in-from-top-1">
                  <Link
                    href={`/admin/beats/${id}`}
                    onClick={() => setActiveDropdownId(null)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                  >
                    <Eye size={13} />
                    View Details
                  </Link>
                  <Link
                    href={`/admin/beats/${id}/edit`}
                    onClick={() => setActiveDropdownId(null)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                  >
                    <Edit size={13} />
                    Edit Beat
                  </Link>
                  <button
                    onClick={() => handleDuplicate(id)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                  >
                    <Copy size={13} />
                    Duplicate
                  </button>
                  <div className="my-1 border-t border-card-border" />
                  <button
                    onClick={() => {
                      setBeatToDelete(id)
                      setActiveDropdownId(null)
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-red-400 hover:bg-red-500/5 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )
      }
    }
  ]

  return (
    <>
      <DataTable columns={columns} data={beats} />

      <ConfirmDialog
        isOpen={!!beatToDelete}
        onClose={() => setBeatToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Beat"
        description="Are you sure you want to delete this beat? This action cannot be undone and will remove the track from the catalog."
        confirmLabel="Delete Track"
        isDestructive
      />
    </>
  )
}
