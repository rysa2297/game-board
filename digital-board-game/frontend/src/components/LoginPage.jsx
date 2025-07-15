import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Users, GraduationCap, Shield } from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    student: { name: '', class: '', subject: 'SPLDV' },
    teacher: { password: '' },
    admin: { password: '' }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const slides = [
    { type: 'student', title: 'Masuk Siswa', icon: GraduationCap },
    { type: 'teacher', title: 'Masuk Guru', icon: Users },
    { type: 'admin', title: 'Masuk Admin', icon: Shield }
  ]

  const playClickSound = () => {
    // Sound will be implemented later
    console.log('Click sound')
  }

  const handleSlideChange = (index) => {
    playClickSound()
    setCurrentSlide(index)
    setError('')
  }

  const handleInputChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    playClickSound()

    const currentType = slides[currentSlide].type
    const data = { type: currentType, ...formData[currentType] }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        onLogin(result.user)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi')
    } finally {
      setLoading(false)
    }
  }

  const renderStudentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          type="text"
          value={formData.student.name}
          onChange={(e) => handleInputChange('student', 'name', e.target.value)}
          placeholder="Masukkan nama Anda"
          required
        />
      </div>
      <div>
        <Label htmlFor="class">Kelas</Label>
        <Input
          id="class"
          type="text"
          value={formData.student.class}
          onChange={(e) => handleInputChange('student', 'class', e.target.value)}
          placeholder="Masukkan kelas Anda"
          required
        />
      </div>
      <div>
        <Label htmlFor="subject">Mata Pelajaran</Label>
        <Input
          id="subject"
          type="text"
          value={formData.student.subject}
          readOnly
          className="bg-gray-100"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Masuk...' : 'Masuk'}
      </Button>
    </form>
  )

  const renderTeacherForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="teacher-password">Password</Label>
        <div className="relative">
          <Input
            id="teacher-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.teacher.password}
            onChange={(e) => handleInputChange('teacher', 'password', e.target.value)}
            placeholder="Masukkan password guru"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Masuk...' : 'Masuk'}
      </Button>
    </form>
  )

  const renderAdminForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="admin-password">Password</Label>
        <div className="relative">
          <Input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.admin.password}
            onChange={(e) => handleInputChange('admin', 'password', e.target.value)}
            placeholder="Masukkan password admin"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Masuk...' : 'Masuk'}
      </Button>
    </form>
  )

  const renderForm = () => {
    switch (slides[currentSlide].type) {
      case 'student': return renderStudentForm()
      case 'teacher': return renderTeacherForm()
      case 'admin': return renderAdminForm()
      default: return null
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => {
            const Icon = slide.icon
            return (
              <div key={slide.type} className="login-slide">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {slide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {index === currentSlide && renderForm()}
                </CardContent>
              </div>
            )
          })}
        </div>
        
        <div className="slide-indicator">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default LoginPage

