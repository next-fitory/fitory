export default function ProfileSection({ user = { name: '홍길동', email: 'gildong@example.com' } }) {
  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-black">
          {user?.name}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black">{user?.name}님</h1>
          </div>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
        <div className="ml-auto flex gap-8 hidden md:flex">
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-1">적립금</p>
            <p className="font-black">2,500원</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-1">쿠폰</p>
            <p className="font-black">3장</p>
          </div>
        </div>
      </div>
    </section>
  )
}
