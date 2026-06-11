import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  IconButton,
  Alert,
  InputAdornment,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

const Login: React.FC = () => {
  const { mode, toggleTheme } = useThemeStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Store token
        localStorage.setItem("token", "dummy-token");
        // Redirect to dashboard
        window.location.href = "/";
      } else {
        setError("Please enter email and password");
      }
      setIsLoading(false);
    }, 1000);
  };

  const floatingParticles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.primary}20, transparent)`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: "blur(40px)",
          }}
        />
      ))}

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Illustration */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  pl: { xs: 0, md: 4 },
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      background: COLORS.gradient.primary,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    School Management System
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: colors.textSecondary,
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    Manage your entire school with our premium, all-in-one
                    management platform. Beautiful, fast, and reliable.
                  </Typography>
                </Box>

                {/* Features */}
                <Stack spacing={2}>
                  {[
                    "Real-time attendance tracking",
                    "Comprehensive fee management",
                    "Advanced exam system",
                    "Beautiful analytics & reports",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `${COLORS.success}20`,
                          }}
                        >
                          <MuiIcons.Check
                            sx={{ color: COLORS.success, fontWeight: 700 }}
                          />
                        </Box>
                        <Typography sx={{ color: colors.text }}>
                          {feature}
                        </Typography>
                      </Stack>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                sx={{
                  p: 4,
                  backgroundImage: isDark
                    ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                    : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
                  boxShadow: isDark
                    ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                    : "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Welcome Back 👋
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: colors.textSecondary }}
                    >
                      Sign in to your account
                    </Typography>
                  </Box>

                  {/* Theme Toggle */}
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      color: colors.text,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                      "&:hover": {
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    {isDark ? <MuiIcons.LightMode /> : <MuiIcons.DarkMode />}
                  </IconButton>
                </Stack>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleLogin}>
                  <Stack spacing={2}>
                    {/* Email */}
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      placeholder="admin@school.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <MuiIcons.Email
                                sx={{
                                  color: colors.textTertiary,
                                }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.02)",
                        },
                      }}
                    />

                    {/* Password */}
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <MuiIcons.Lock
                                sx={{
                                  color: colors.textTertiary,
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? (
                                  <MuiIcons.VisibilityOff />
                                ) : (
                                  <MuiIcons.Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.02)",
                        },
                      }}
                    />

                    {/* Remember Me & Forgot */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                        }
                        label="Remember me"
                      />
                      <Link
                        href="#"
                        sx={{
                          color: COLORS.primary,
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Stack>

                    {/* Sign In Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        disabled={isLoading}
                        sx={{
                          background: COLORS.gradient.primary,
                          fontWeight: 600,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: "none",
                          fontSize: "1rem",
                        }}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </motion.div>

                    {/* Divider */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ my: 2 }}
                    >
                      <Divider sx={{ flex: 1 }} />
                      <Typography
                        variant="caption"
                        sx={{ color: colors.textTertiary }}
                      >
                        Or demo with
                      </Typography>
                      <Divider sx={{ flex: 1 }} />
                    </Stack>

                    {/* Demo Credentials */}
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: colors.textSecondary }}
                      >
                        Demo Email: <strong>admin@school.com</strong>
                      </Typography>
                      <br />
                      <Typography
                        variant="caption"
                        sx={{ color: colors.textSecondary }}
                      >
                        Demo Password: <strong>password123</strong>
                      </Typography>
                    </Box>
                  </Stack>
                </form>

                {/* Footer */}
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textTertiary,
                    mt: 3,
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  © 2024 School Management System. All rights reserved.
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
