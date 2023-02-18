package br.com.listit.listit.services.remote.jikan;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Expiry;

import net.sandrohc.jikan.cache.JikanCache;

public class JikanCacheImpl implements JikanCache {
	
	public static JikanCacheImpl createJikanCache() {
		return new JikanCacheImpl();
	}
	
	private JikanCacheImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	private final Cache<String, JikanValueHolder> cache = Caffeine.newBuilder().maximumSize(10_000)
			.expireAfter(new JikanExpiry()).build();

	public void put(String key, Object value, OffsetDateTime expires) {
		cache.put(key, new JikanValueHolder(value, expires));
	}

	public Optional<Object> get(String key) {
		return Optional.ofNullable(cache.getIfPresent(key)).map(holder -> holder.value);
	}

	class JikanValueHolder {
		public final Object value;
		public final long expireTime;

		public JikanValueHolder(Object value, OffsetDateTime expires) {
			this.value = value;
			this.expireTime = TimeUnit.SECONDS.toNanos(expires.toEpochSecond());
		}
	}

	class JikanExpiry implements Expiry<String, JikanValueHolder> {
		public long expireAfterCreate(String key, JikanValueHolder value, long currentTime) {
			return value.expireTime;
		}

		public long expireAfterUpdate(String key, JikanValueHolder value, long currentTime, long currentDuration) {
			return currentDuration; // Do not modify expire date
		}

		public long expireAfterRead(String key, JikanValueHolder value, long currentTime, long currentDuration) {
			return currentDuration; // Do not modify expire date
		}
	}
}
