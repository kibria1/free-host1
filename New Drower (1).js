DRAW WITH FINGER
dv = new DrawingView(this);
linear1.addView(dv);
mPaint = new Paint();
mPaint.setAntiAlias(true);
mPaint.setDither(true);
mPaint.setColor(Color.GREEN); 
mPaint.setStyle(Paint.Style.STROKE); 
mPaint.setStrokeJoin(Paint.Join.ROUND); 
mPaint.setStrokeCap(Paint.Cap.ROUND); 
mPaint.setStrokeWidth(12);
}
DrawingView dv; private Paint mPaint;
private Canvas mCanvas;

public class DrawingView extends View {
public int width;
public int height;
private Bitmap mBitmap;
private Path mPath;
private Paint mBitmapPaint;
Context context; private Paint circlePaint; private Path circlePath;

public DrawingView(Context c) {
super(c);
context=c;
mPath = new Path();
mBitmapPaint = new Paint(Paint.DITHER_FLAG); 
circlePaint = new Paint();
circlePath = new Path();
circlePaint.setAntiAlias(true);
circlePaint.setColor(Color.BLUE); 
circlePaint.setStyle(Paint.Style.STROKE); 
circlePaint.setStrokeJoin(Paint.Join.MITER); 
circlePaint.setStrokeWidth(4f);
}

@Override protected void onSizeChanged(int w, int h, int oldw, int oldh) { super.onSizeChanged(w, h, oldw, oldh); mBitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888); mCanvas = new Canvas(mBitmap); }

@Override protected void onDraw(Canvas canvas) { super.onDraw(canvas); canvas.drawBitmap( mBitmap, 0, 0, mBitmapPaint);
canvas.drawPath( mPath, mPaint); canvas.drawPath( circlePath, circlePaint);
invalidate(); }

private float mX, mY;
private static final float TOUCH_TOLERANCE = 4;
private void touch_start(float x, float y) { mPath.reset(); mPath.moveTo(x, y); mX = x; mY = y; }

private void touch_move(float x, float y) { float dx = Math.abs(x - mX); float dy = Math.abs(y - mY); if (dx >= TOUCH_TOLERANCE || dy >= TOUCH_TOLERANCE) { mPath.quadTo(mX, mY, (x + mX)/2, (y + mY)/2); mX = x; mY = y; circlePath.reset(); circlePath.addCircle(mX, mY, 30, Path.Direction.CW); } }
private void touch_up() { mPath.lineTo(mX, mY); circlePath.reset();
mCanvas.drawPath(mPath, mPaint);
mPath.reset(); }

@Override public boolean onTouchEvent(MotionEvent event) {
float x = event.getX(); float y = event.getY();
switch (event.getAction()) {
case MotionEvent.ACTION_DOWN: touch_start(x, y); invalidate(); break;
case MotionEvent.ACTION_MOVE: touch_move(x, y); invalidate(); break;
case MotionEvent.ACTION_UP: touch_up(); invalidate(); break; } return true; }

//To share add this code above code

}
private void storeImage(Bitmap image) { java.io.File pictureFile = new java.io.File(getExternalCacheDir() + "/image.jpg");
if (pictureFile == null) { Log.d("MainActivity", "Error creating media file, check storage permissions: ");
return; } try {
java.io.FileOutputStream fos = new java.io.FileOutputStream(pictureFile); image.compress(Bitmap.CompressFormat.PNG, 90, fos);
fos.close(); } catch (java.io.FileNotFoundException e) { Log.d("MainActivity", "File not found: " + e.getMessage()); } catch (java.io.IOException e) { Log.d("MainActivity", "Error accessing file: " + e.getMessage());
}

Intent iten = new Intent(android.content.Intent.ACTION_SEND);
iten.setType("*/*");
iten.putExtra(Intent.EXTRA_STREAM, Uri.fromFile(new java.io.File(getExternalCacheDir() + "/image.jpg")));
startActivity(Intent.createChooser(iten, "Send image"));
}

private Bitmap getBitmapFromView(View view) { Bitmap returnedBitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(),Bitmap.Config.ARGB_8888);
Canvas canvas = new Canvas(returnedBitmap);
android.graphics.drawable.Drawable bgDrawable =view.getBackground();
if (bgDrawable!=null) { bgDrawable.draw(canvas); } else{ canvas.drawColor(Color.WHITE); }
view.draw(canvas);
return returnedBitmap;

//on the button
storeImage(getBitmapFromView(linear1));

//To Clear
mCanvas.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);