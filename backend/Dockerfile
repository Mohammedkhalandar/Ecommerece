# ════════════════════════════════════════════════════════════════
# ShopSphere Backend Dockerfile
# Multi-stage build: Maven builder → JRE 21 slim runtime
# ════════════════════════════════════════════════════════════════

# ── Stage 1: Build ───────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /build

# Copy Maven wrapper and POM first (layer caching for dependencies)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download dependencies (cached if POM unchanged)
RUN ./mvnw dependency:go-offline -q

# Copy source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests -q

# ── Stage 2: Runtime ─────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime

# Security: non-root user
RUN addgroup -S shopsphere && adduser -S shopsphere -G shopsphere

WORKDIR /app

# Copy the built JAR
COPY --from=builder /build/target/shopsphere-backend-*.jar app.jar

# Upload directory
RUN mkdir -p /app/uploads && chown shopsphere:shopsphere /app/uploads

# Logs directory
RUN mkdir -p /app/logs && chown shopsphere:shopsphere /app/logs

USER shopsphere

EXPOSE 8080

# JVM tuning for containers
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:+ExitOnOutOfMemoryError"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -q --spider http://localhost:8080/api/health || exit 1
