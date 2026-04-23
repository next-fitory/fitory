const FOOTER_LINKS = [
  {
    title: '고객센터',
    links: ['공지사항', '자주 묻는 질문', '1:1 문의'],
  },
  {
    title: '서비스',
    links: ['회사소개', '채용정보', '입점/제휴 문의'],
  },
  {
    title: '정책',
    links: ['이용약관', '개인정보처리방침', '청소년보호정책'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-2xl font-black tracking-widest mb-3">FITORY</p>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              트렌디한 패션을 합리적인 가격으로.<br />
              국내 최대 패션 플랫폼 FITORY
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <p className="font-bold mb-3">{group.title}</p>
                <ul className="space-y-2 text-gray-400 text-xs">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-gray-500">
          © 2026 FITORY. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
