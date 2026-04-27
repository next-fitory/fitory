'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLikedIds, toggleLike } from '@/lib/data/likes'
import { useUserStore } from '@/store/useUserStore'
import { useUiStore } from '@/store/useUiStore'

export default function LikesButton({ product }) {
    const user = useUserStore(state => state.user)
    const openModal = useUiStore(state => state.openModal)
    const queryClient = useQueryClient()

    const { data: likedIds = [] } = useQuery({
        queryKey: ['likedIds', user?.id],
        queryFn: () => getLikedIds(user?.id),
        enabled: !!user?.id,
    })

    const mutation = useMutation({
        mutationFn: () => toggleLike(user.id, product.id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['likedIds', user?.id] })
            const prev = queryClient.getQueryData(['likedIds', user?.id]) ?? []
            const pid = Number(product.id)
            const next = prev.includes(pid)
                ? prev.filter(id => id !== pid)
                : [...prev, pid]
            queryClient.setQueryData(['likedIds', user?.id], next)
            return { prev }
        },
        onError: (_err, _v, ctx) => {
            queryClient.setQueryData(['likedIds', user?.id], ctx.prev)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['likedIds', user?.id] })
        },
    })

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user) {
            openModal(
                'login',
                { title: '로그인', description: '로그인이 필요합니다.' },
                { size: 'sm', backdropClosable: true, escapeClosable: true }
            )
            return
        }

        mutation.mutate()
    }

    const isLiked = likedIds.includes(Number(product.id))

    return (
        <button
            onClick={handleClick}
            aria-label="찜하기"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill={isLiked ? 'red' : 'none'}
                viewBox="0 0 24 24"
                stroke={isLiked ? 'red' : 'currentColor'}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    )
}
