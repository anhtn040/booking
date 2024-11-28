package com.travelbe.config.security;

import com.travelbe.config.exception.UnauthorizedException;
import com.travelbe.model.TokenValue;
import com.travelbe.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
        throws ServletException, IOException {
        String jwt = jwtUtil.getJwtFromHeader(request);
        if(Objects.nonNull(jwt)) {
            TokenValue value = jwtUtil.getValueAccessToken(jwt);
            if(Objects.nonNull(value)) {
                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                if(!value.permissions().isEmpty())
                    value.permissions().forEach(permission -> authorities.add(new SimpleGrantedAuthority(permission)));
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(value.userId().toString(), null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }

}
